import { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
            if (!res.ok) throw new Error('Ошибка загрузки данных');

            const data = await res.json();
            setPosts((prev) => {
                const existingIds = new Set(prev.map((post) => post.id));
                const newPosts = data.filter((post: Post) => !existingIds.has(post.id));
                return [...prev, ...newPosts];
            });
        } catch (err: any) {
            setError(err.message || 'Неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page]);

    return (
        <div className="container py-4">
            <h2>Посты</h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <ul className="list-group mb-3">
                {posts.map((post) => (
                    <li key={post.id} className="list-group-item">
                        <h4>{post.title}</h4>
                        <p className="mb-0">{post.body}</p>
                    </li>
                ))}
            </ul>

            <div className="d-flex justify-content-center">
                {loading ? (
                    <div className="spinner-border text-secondary" role="status"></div>
                ) : (
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Загрузить ещё
                    </button>
                )}
            </div>
        </div>
    );
}
