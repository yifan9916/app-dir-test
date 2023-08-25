type Props = {
  params: {
    id: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;

  return <div>Episode Detail Page: {params.id}</div>;
}
