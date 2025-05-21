"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
    return (
        <section className="relative py-8 md:py-16 overflow-hidden bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
                        EMRS - Eklavya Model Residential School
                    </h1>

                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0">
                        एकलव्य मॉडल आवासीय विद्यालय बोझिया बहराइच के संचालन की स्वीकृति जनजाति कार्य मंत्रालय भारत सरकार द्वारा की गयी है।
                        मुख्यतः उत्तर प्रदेश जनपद बहराइच के तहसील एवं विकासखण्ड-मिंहिपुरवा में निवासरत थारू जनजाति जिनकी आबादी 11159 है एवं निकट जनपदों में निवासरत जनजाति अभिभावकों के पाल्य जनजाति छात्र-छात्राओं के सर्वांगीण विकास के अन्तर्गत गुणवत्तापरक एवं रोजगारपरक शिक्षा के माध्यम से प्रशासनिक सेवा, मेडिकल, इंजीनियरिंग, आई.आई.टी., सेना, पुलिस, शिक्षा, सिविल परीक्षाओं में सफलता प्राप्ति के उद्देश्य से जनजाति मंत्रालय भारत सरकार के दिशा-निर्देशों में शैक्षिक उत्थान हेतु शिक्षा प्रदान करने हेतु उत्तर प्रदेश सरकार द्वारा केन्द्रीय माध्यमिक शिक्षा बोर्ड, (CBSE), नई दिल्ली से सम्बद्धता प्रदान की जानी है।
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0">
                        परंतु अध्यापकों शासन से कार्मिकों की नियुक्ति प्रक्रिया में बिलंब एवं बोर्ड के मानक पूर्ण न होने कारण सम्बद्धता हेतु आवेदन नहीं हो सका।
                        के क्रम में उ०प्र० अनुसूचित जनजाति आर्थिक एवं शैक्षिक विकास समिति की बैठक में निर्णयानुसार विद्यालय का संचालन कक्षा-6 से 8 तक प्रत्येक कक्षा में 15 बालक एवं 15 बालिका कुल 30 क्षमता से सत्र 2016-17 से एकलव्य मॉडल आवासीय विद्यालय परिसर में संचालित किया जा रहा है।
                    </p>
                </div>
            </div>
        </section>
    )
}
