import type { Document } from "../model/Document.js" 

const docs = new Map<string, Document>

export function getDoc(id: string) : Document | undefined {
    return docs.get(id);
}

export function setDoc(doc: Document) : void {
    docs.set(doc.id, doc);
}

export function listDocs(): Document[] {
    return [...docs.values()];
}

export function hasDocs(id: string) : boolean {
    return docs.has(id);
}