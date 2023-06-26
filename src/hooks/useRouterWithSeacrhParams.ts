import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useRouterWithSeacrhParams()

{
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    return {router, pathname, createQueryString, searchParams}
}