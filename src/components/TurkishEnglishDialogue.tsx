'use client';

import React from 'react';

interface DialogueLine {
  speaker: string;
  turkish: string;
  english: string;
  isHome?: boolean;
}

const dialogueData: DialogueLine[] = [
  {
    speaker: "Agit",
    turkish: "Hayır içindeki bilgilere bir şey oluyor mu abi? Çünkü oradaki bilgiler benim bu. Yani hellot halk hesaplarından daha değerli.",
    english: "No, is something happening to the information inside, bro? Because the information there is mine. I mean, it's more valuable than hellot public accounts.",
    isHome: false
  },
  {
    speaker: "ÖZÇAN",
    turkish: "Hiçbir şey olmuyor, çünkü ben durmadan maillerimi kaldırır. Farklı telefona koyduğum için.",
    english: "Nothing happens, because I constantly remove my emails. Because I put it on a different phone.",
    isHome: false
  },
  {
    speaker: "Agit",
    turkish: "Bilmiyorum çünkü oradaki dediğim gibi bilgileri vesaire.",
    english: "I don't know because the information there, as I said, and so on.",
    isHome: false
  },
  {
    speaker: "Agit",
    turkish: "Ben birçok şeyi maille zaten gayetti da numaralarımı kadar.",
    english: "I already did many things via email, quite well, as much as my numbers.",
    isHome: false
  },
  {
    speaker: "Elif",
    turkish: "Mail kaldırmak şart mı? Özcan bey hanı yeni mail eklese?",
    english: "Is removing mail mandatory? What if Mr. Özcan adds a new email?",
    isHome: true
  },
  {
    speaker: "ÖZÇAN",
    turkish: "Telef.",
    english: "Phone.",
    isHome: false
  },
  {
    speaker: "Elif",
    turkish: "Olmuyor mu öyle?",
    english: "Doesn't it work that way?",
    isHome: true
  },
  {
    speaker: "ÖZÇAN",
    turkish: "Şimdi size öyle söyleyeyim.",
    english: "Let me tell you this way now.",
    isHome: false
  },
  {
    speaker: "ÖZÇAN",
    turkish: "O maille hesap telefonda tanımlı ya?",
    english: "That email account is registered on the phone, right?",
    isHome: false
  },
  {
    speaker: "ÖZÇAN",
    turkish: "Şimdi onu kaldırdığı zaman?",
    english: "Now when he removes it?",
    isHome: false
  },
  {
    speaker: "ÖZÇAN",
    turkish: "Ilı şey olacak. Oğlum telefonda tanımlılığı bitecek. Yeni bir mail kurduğu zaman.",
    english: "Something lukewarm will happen. Son, its registration on the phone will end. When he sets up a new email.",
    isHome: false
  }
];

export default function TurkishEnglishDialogue() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Turkish-English Dialogue Translation
        </h1>
        
        <div className="space-y-6">
          {dialogueData.map((line, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">
                    {line.speaker.charAt(0)}
                  </span>
                </div>
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold text-white mr-3">
                    {line.speaker}
                  </h3>
                  {line.isHome && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      🏠
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/20 rounded-lg p-4 border-l-4 border-red-500">
                  <h4 className="text-red-300 font-semibold mb-2 text-sm uppercase tracking-wide">
                    Turkish (Türkçe)
                  </h4>
                  <p className="text-white leading-relaxed">
                    {line.turkish}
                  </p>
                </div>
                
                <div className="bg-blue-500/20 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="text-blue-300 font-semibold mb-2 text-sm uppercase tracking-wide">
                    English
                  </h4>
                  <p className="text-white leading-relaxed">
                    {line.english}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-yellow-500/20 rounded-lg p-6 border border-yellow-500/30">
          <h2 className="text-yellow-300 font-bold text-lg mb-4">Context & Explanation</h2>
          <div className="text-white space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Context:</strong> This appears to be a conversation about email account management and phone registration. The speakers are discussing:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Email Security:</strong> Agit is concerned about the safety of information stored in email accounts</li>
              <li><strong>Account Management:</strong> Özcan explains his practice of removing emails from devices</li>
              <li><strong>Phone Registration:</strong> Discussion about how email accounts are linked to phone devices</li>
              <li><strong>Technical Process:</strong> Özcan explains what happens when you remove an email account from a phone and set up a new one</li>
            </ul>
            <p>
              <strong>Note:</strong> Some phrases are colloquial Turkish and don't translate perfectly into formal English. The speakers use informal language typical of casual conversation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}