interface ListType {
  id: string;
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ListProps {
  data: ListType[];
}

const List = (props: ListProps) => {
  const { data } = props;
  console.log("data", data);
  if (data.length === 0) {
    return <p>No data</p>;
  }
  return (
    <ul>
      {data.map((item) => (
        <li key={item._id || item.id}>
          {item._id || item.id} - {item.title}
        </li>
      ))}
    </ul>
  );
};

export default List;
