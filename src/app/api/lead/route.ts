import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ApiResponse } from '@/types';

// 定义请求体验证 Schema
const leadSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  locale: z.string(),
  product: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 验证输入数据
    const validatedData = leadSchema.parse(body);
    
    console.log("📧 New lead received:", validatedData);
    
    // TODO: 集成邮件服务（如 Resend、SendGrid）
    // 示例：使用 Resend 发送通知邮件
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: 'sales@yourdomain.com',
      subject: `New Lead: ${validatedData.name}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Company:</strong> ${validatedData.company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${validatedData.phone || 'N/A'}</p>
        <p><strong>Message:</strong> ${validatedData.message || 'N/A'}</p>
        <p><strong>Product:</strong> ${validatedData.product || 'N/A'}</p>
        <p><strong>Locale:</strong> ${validatedData.locale}</p>
      `,
    });
    */
    
    // TODO: 保存到数据库（如 PostgreSQL、MongoDB）
    /*
    await db.leads.create({
      data: validatedData,
    });
    */
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead submitted successfully' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: error.issues 
        },
        { status: 400 }
      );
    }
    
    console.error("❌ Lead submission error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
