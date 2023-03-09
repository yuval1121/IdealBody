import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';

const universalConverter = <T extends DocumentData>() => {
  return {
    toFirestore(data: WithFieldValue<T>): DocumentData {
      return data;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot<T>,
      options: SnapshotOptions
    ): T {
      const data = snapshot.data(options);
      return data;
    },
  };
};

export default universalConverter;
