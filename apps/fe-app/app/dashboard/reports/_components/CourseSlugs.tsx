"use client";

import { Api } from "apps/fe-app/models/axios";
import { useEffect, useState } from "react";

const CoursesSlugs = () => {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlugs = async () => {
      try {
        const apiClient = new Api();
        const response = await apiClient.api.coursesSlugsList();
        const data = response.data;
        setSlugs(data);
      } catch (err) {
        setError("مشکلی در دریافت داده‌ها پیش آمد.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlugs();
  }, []);

  if (loading) return <p>در حال دریافت داده‌ها...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>لیست Slugهای دوره‌ها</h2>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>{slug}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesSlugs;
