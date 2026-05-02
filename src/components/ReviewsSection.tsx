import { useState } from "react";
import { Star, ThumbsUp, ChevronDown, User } from "lucide-react";

interface ReviewsSectionProps {
  productRating: number;
  productReviews: number;
  productName: string;
}

const sampleReviews = [
  {
    id: 1, name: "Adebayo O.", date: "2 weeks ago", rating: 5, verified: true,
    title: "Excellent product, exactly as described",
    text: "Very happy with this purchase. The product arrived well-packaged and in perfect condition. Performance is outstanding and exceeds my expectations. Would definitely recommend to anyone looking for quality.",
    helpful: 24,
  },
  {
    id: 2, name: "Chioma E.", date: "1 month ago", rating: 4, verified: true,
    title: "Great value for money",
    text: "Good build quality and works perfectly. Only giving 4 stars because delivery took a bit longer than expected, but the product itself is fantastic. Customer support was also very responsive.",
    helpful: 18,
  },
  {
    id: 3, name: "Ibrahim M.", date: "1 month ago", rating: 5, verified: true,
    title: "Best purchase this year!",
    text: "I've been using this for about a month now and it's been absolutely brilliant. Fast, reliable, and looks premium. The battery life is particularly impressive.",
    helpful: 12,
  },
  {
    id: 4, name: "Funke A.", date: "2 months ago", rating: 4, verified: false,
    title: "Solid choice, minor issues",
    text: "Overall a very good product. There were some minor software issues initially but they were resolved with an update. The design is sleek and modern.",
    helpful: 8,
  },
  {
    id: 5, name: "Emeka N.", date: "3 months ago", rating: 5, verified: true,
    title: "Premium quality all around",
    text: "This is my second purchase from MediaMall and once again, the quality is top-notch. Highly recommended!",
    helpful: 15,
  },
];

const ratingDistribution = [
  { stars: 5, percent: 65 },
  { stars: 4, percent: 22 },
  { stars: 3, percent: 8 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 2 },
];

const ReviewsSection = ({ productRating, productReviews, productName }: ReviewsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Set<number>>(new Set());

  const displayedReviews = showAll ? sampleReviews : sampleReviews.slice(0, 3);

  const handleHelpful = (reviewId: number) => {
    setHelpfulClicked((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) next.delete(reviewId);
      else next.add(reviewId);
      return next;
    });
  };

  return (
    <section className="mt-12">
      <h2 className="section-title mb-6 flex items-center gap-2">
        <div className="w-1 h-6 rounded-full bg-warning" />
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Summary */}
        <div className="product-card p-6 space-y-4">
          <div className="text-center">
            <p className="text-5xl font-extrabold text-foreground">{productRating}</p>
            <div className="flex items-center justify-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(productRating) ? "fill-warning text-warning" : "text-border"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1.5">Based on {productReviews} reviews</p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center gap-2.5">
                <span className="text-xs font-medium text-muted-foreground w-3">{dist.stars}</span>
                <Star className="w-3 h-3 fill-warning text-warning" />
                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-warning transition-all duration-500"
                    style={{ width: `${dist.percent}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{dist.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {displayedReviews.map((review) => (
            <div key={review.id} className="product-card p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      {review.verified && (
                        <span className="text-[10px] font-semibold text-success bg-success/10 px-1.5 py-0.5 rounded">Verified</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-warning text-warning" : "text-border"}`} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{review.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
              </div>

              <button
                onClick={() => handleHelpful(review.id)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  helpfulClicked.has(review.id)
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                Helpful ({review.helpful + (helpfulClicked.has(review.id) ? 1 : 0)})
              </button>
            </div>
          ))}

          {!showAll && sampleReviews.length > 3 && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              Show All Reviews <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
