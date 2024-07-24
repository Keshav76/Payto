interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps): JSX.Element {
  return (
    <>
      <h2 className="text-2xl border-b pb-2">{title}</h2>
      <div>{children}</div>
    </>
  );
}
export default Card;
