import nodemailer from 'nodemailer';
import Bottleneck from 'bottleneck'

interface EmailData {
    to: string;
    subject:string;
    text:string;
}

const limiter = new Bottleneck({
minTime: 1000,
})

export async function POST(req: Request){
    const {to, subject, text} : EmailData = await req.json();

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port:465,
        secure:true,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        },
    });

    try{
        await limiter.schedule(()=> 
        transporter.sendMail({
            from:`Diwash kafle ${process.env.SMTP_USER}`,
            to,
            subject,
            text,
        }))

        return new Response (JSON.stringify({
            message:"Email sent!"
        })
    , {
        status:200
    }
    )
    }catch(err){
        return new Response(JSON.stringify({error:'Failed to send email! '+' error: '+err}),{status:500})
    }
}