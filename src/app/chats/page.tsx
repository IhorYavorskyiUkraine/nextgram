import Image from "next/image";

export default function Chats() {
   return (
      <div>
         <h1>NextGram</h1>
         <p>NextGram is a social media platform built with Next.js.</p>
         <Image
            src="/nextgram.png"
            alt="NextGram logo"
            width={200}
            height={200}
         />
      </div>
   );
}
