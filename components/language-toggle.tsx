'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';

export function LanguageToggle() {
    const router = useRouter();
    const pathname = usePathname(); // current path, e.g. /en/about
    const { t } = useTranslation('common');

    const changeLanguage = (lang: string) => {
        const segments = pathname.split('/');
        const currentLocale = segments[1];

        if (currentLocale !== lang) {
            // Replace the locale in the URL path
            segments[1] = lang;
            const newPath = segments.join('/');
            router.push(newPath);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('hi')}>हिन्दी</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
