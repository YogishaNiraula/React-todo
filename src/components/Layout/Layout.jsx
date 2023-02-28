export default function Layout({ children }) {
  return (
    <div className="flex justify-start space-x-5">
      <aside className="min-h-full p-10 ">
        <h5>Projects</h5>
      </aside>
      <main className="container mx-auto p-10">{children}</main>
    </div>
  );
}
