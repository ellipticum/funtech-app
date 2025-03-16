import { ICard } from '@/shared/interfaces/card'
import { generateTimeframe } from '@/widgets/Weekly/model/helpers/generateTimeframe'
import { generateRandomPrice } from '@/widgets/Weekly/model/helpers/generateRandomPrice'

export const originalCards: ICard[] = [
    {
        id: 1,
        name: 'Dreamer #1',
        image: 'nft-1.jpeg',
        price: generateRandomPrice(),
        ...generateTimeframe()
    },
    {
        id: 2,
        name: 'Soul #42',
        image: 'nft-2.jpeg',
        price: generateRandomPrice(),
        ...generateTimeframe()
    },
    {
        id: 3,
        name: 'Genesis #7',
        image: 'nft-3.jpeg',
        price: generateRandomPrice(),
        ...generateTimeframe()
    },
    {
        id: 4,
        name: 'Realm #23',
        image: 'nft-4.jpeg',
        price: generateRandomPrice(),
        ...generateTimeframe()
    },
    {
        id: 5,
        name: 'Landscape #11',
        image: 'nft-5.jpeg',
        price: generateRandomPrice(),
        ...generateTimeframe()
    },
    {
        id: 6,
        name: 'Punk #301',
        image: 'nft-3.jpeg',
        price: generateRandomPrice(),
        ...generateTimeframe()
    }
]
