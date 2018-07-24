export class Api {
  db: FirebaseFirestore.Firestore;

  constructor(db) {
    this.db = db;
  }

  async getColor(hexCode): Promise<any> {
    const doc = await this.db.collection('colors').doc(hexCode).get();
    if(doc!==null){
      return doc.data();
    }
    return null;
  }
}
