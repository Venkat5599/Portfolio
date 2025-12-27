import React from 'react';
import ContactClient from './ContactClient';

export default function ContactPage() {
  return (
    <main className="container w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32">
      <ContactClient />
    </main>
  );
}
