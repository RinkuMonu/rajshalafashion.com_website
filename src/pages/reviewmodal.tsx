import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaStar, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: RatingPayload) => void;
  productName: string;
}

interface RatingPayload {
  rating: number;
  comment?: string;
  email?: string;
  referenceWebsite?: string;
}

export const RatingModal = ({ isOpen, onClose }: RatingModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [errors, setErrors] = useState<{ comment?: string }>({});
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

  const { id } = useParams();
  console.log(id);

  const validate = (): boolean => {
    const newErrors: { comment?: string } = {};

    if (!review.trim()) {
      newErrors.comment = "Please enter your review";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!validate()) return;

    const payload: RatingPayload = {
      rating,
      comment: review.trim(),
    };

    try {
      const response = await fetch(
        `${baseUrl}/sendreview/${id}?referenceWebsite=${referenceWebsite}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to post review");

      toast.success("Thank You... Review submitted!");
      resetForm();
      setTimeout(() => {
        onClose();
      }, 3000);
      // } catch (error: any) {
      //   console.error("Review error:", error.message);
      //   toast.error(error.message, {
      //     duration: 4000,
      //   });

    } catch (error: unknown) {
      const err = error as Error;
      console.error("Review error:", err.message);
      toast.error(err.message, {
        duration: 4000,
      });

      resetForm();
      setTimeout(() => {
        onClose();
      }, 4000);
    }
  };

  const resetForm = () => {
    setRating(0);
    setHover(0);
    setReview("");
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>

          <h2 className="text-2xl font-bold mb-4 text-gray-700">Rate This</h2>

          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  key={index}
                  className={`text-3xl mx-1 cursor-pointer ${ratingValue <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-400"
                    }`}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <FaStar />
                </button>
              );
            })}
          </div>

          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Review *
            </label>
            <textarea
              id="review"
              rows={4}
              className={`w-full px-3 py-2 border rounded-md ${errors.comment ? "border-red-500" : "border-gray-400"
                }`}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-500">{errors.comment}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`w-full py-3 px-4 rounded-md font-medium text-white ${rating === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#393838] hover:bg-[#C561B1"
              }`}
          >
            Submit Rating
          </button>
        </div>
      </div>
    </>
  );
};
