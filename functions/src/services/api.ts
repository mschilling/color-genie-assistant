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

  async getColorByName(name): Promise<any> {
    const snapshot = await this.db.collection('colors')
      .where('name', '==', name).get();

      if(snapshot.docs.length === 0) {
        return null;
      }
      return snapshot.docs[0].data();
  }

}
