'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [emails, setEmails] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSendEmails = async (e: FormEvent) => {
    e.preventDefault();

    const emailList = emails.split(',').map(email => email.trim());

    for (const email of emailList) {
      await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject,
          text: message,
        }),
      });
    }
  };

  return (
    <div className='pt-10 space-y-10'>
      <h1 className='text-center'>Bulk Email Sender</h1>
      <form onSubmit={handleSendEmails} className='flex text-black flex-col space-y-2 h-full w-full items-center'>
        <textarea
          placeholder="Enter emails, separated by commas"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className='border-2 border-black w-[600px] rounded-lg p-2'
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className='border-2 border-black w-[600px] rounded-lg p-2'
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='border-2 border-black w-[600px] rounded-lg p-2'
        />
        <button className='bg-black rounded-lg text-white p-3' type="submit">Send Emails</button>
      </form>
    </div>
  );
}
