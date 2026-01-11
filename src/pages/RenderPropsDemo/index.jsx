import React from "react";
import DataFetcher from "@/components/DataFetcher";

export default function RenderPropsDemo() {
  return (
    <div>
      <h2>Render Props Demo</h2>

      <h3>Posts List</h3>
      <DataFetcher url="https://jsonplaceholder.typicode.com/posts?_limit=5">
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error}</p>;

          return (
            <ul>
              {data.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          );
        }}
      </DataFetcher>

      <h3>Users List</h3>
      <DataFetcher url="https://jsonplaceholder.typicode.com/users?_limit=3">
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error}</p>;

          return (
            <ul>
              {data.map((user) => (
                <li key={user.id}>
                  {user.name} – {user.email}
                </li>
              ))}
            </ul>
          );
        }}
      </DataFetcher>
    </div>
  );
}
