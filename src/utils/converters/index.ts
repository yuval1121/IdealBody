import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';

const universalConverter = <
  T extends DocumentData
>(): FirestoreDataConverter<T> => {
  return {
    toFirestore(data: WithFieldValue<T>) {
      return data;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot<T>,
      options: SnapshotOptions
    ) {
      return snapshot.data(options);
    },
  };
};

export default universalConverter;
