export default function Player({ url }: { url: string }) {
  return (
    <>
      {" "}
      <video controls src={url}></video>
    </>
  );
}
