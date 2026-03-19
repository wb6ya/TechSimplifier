import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, Schema, SchemaType } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '@/lib/prompt';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const responseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    explanation: {
      type: SchemaType.STRING,
      description: 'الشرح الوافي باللهجة السعودية مع الأمثلة هنا...'
    },
    terms: {
      type: SchemaType.ARRAY,
      description: 'قائمة بأهم المصطلحات المذكورة.',
      items: {
        type: SchemaType.OBJECT,
        properties: {
          term: { type: SchemaType.STRING, description: 'المصطلح الإنجليزي' },
          definition: { type: SchemaType.STRING, description: 'الشرح المبسط' }
        },
        required: ['term', 'definition']
      }
    },
    resources: {
      type: SchemaType.ARRAY,
      description: '4 مصادر: 2 توثيق و 2 يوتيوب',
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING, description: 'عنوان المصدر' },
          url: { type: SchemaType.STRING, description: 'الرابط الفعلي' },
          type: { type: SchemaType.STRING, description: 'doc أو youtube' }
        },
        required: ['title', 'url', 'type']
      }
    }
  },
  required: ['explanation', 'terms', 'resources']
};

export const maxDuration = 180; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const textBlob = body.text;

    if (!textBlob || typeof textBlob !== 'string' || !textBlob.trim()) {
      return NextResponse.json(
        { error: 'وش السالفة؟ يبدو أنك نسيت تدخل النص!' },
        { status: 400 }
      );
    }

    const truncatedContent = textBlob.slice(0, 30000); 

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });

    const result = await model.generateContent(`قم بشرح هذا المحتوى التقني:\n\n${truncatedContent}`);
    const responseText = result.response.text();
    const jsonResult = JSON.parse(responseText);

    return NextResponse.json(jsonResult);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'معليش، صار خطأ غير متوقع في السيرفر.' },
      { status: 500 }
    );
  }
}
