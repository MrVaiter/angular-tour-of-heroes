import { Account } from "./account";

export interface Team{
    id: number,
    name: string,
    members: Account[]
}