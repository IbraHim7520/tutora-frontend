import { cookies } from "next/headers";
import Image from "next/image";

const RatingAndReviewspage = async () => {
  const cookieDatas = await cookies();
  const cookieStore = cookieDatas.toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reviews/get-all-reviews`,
    {
      method: "GET",
      headers: {
        Cookie: cookieStore,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();
  const reviews = result?.data || [];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">⭐ Ratings & Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review: any) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border shadow-sm p-5 flex gap-4"
            >
              {/* Student Avatar */}
              <div className="shrink-0">
                <Image
                  src={review.user?.image || "/avatar.png"}
                  alt={review.user?.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{review.user?.name}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(review.teachingsession?.date).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  Session:{" "}
                  <span className="font-medium text-gray-700">
                    {review.teachingsession?.name}
                  </span>
                </p>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < review.rating ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700">{review.opinion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingAndReviewspage;
