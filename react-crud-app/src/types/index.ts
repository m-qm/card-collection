export interface Card {
    id: string;
    name: string;
    manaCost?: string;
    description: string;
    type: string;
    rarity: string;
    set: string;
    text: string;
    imageUrl: string;
}

export interface Collection {
    id: string;
    name: string;
    cards: Card[];
}