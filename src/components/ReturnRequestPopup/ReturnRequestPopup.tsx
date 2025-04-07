import React, { useState } from "react";

import { Input, TextArea } from "@components/common";
import { OrderItem } from "@pages/MyOrders/MyOrders";
import ReturnOrdersApi from "@api/customerretrunrequests.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isLoader, updateLoader } from "@redux/slices/loaderSlice";

interface ReturnRequestPopupProps {
  showReturnProduct: OrderItem;
  onClose: () => void;
}

const ReturnRequestPopup= ({
  onClose,
  showReturnProduct,
}: ReturnRequestPopupProps) => {
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useDispatch();
  const loader = useSelector(isLoader);
  const queryclient = useQueryClient()
  const returnrequestapi = new ReturnOrdersApi();

  const returnRequest = async (formData: FormData) => {
      dispatch(updateLoader(true));
      return await returnrequestapi.ReturnRequest(formData);
    };

  const { mutateAsync } = useMutation({
    mutationFn: returnRequest,
    onSuccess: () => {
      toast.success("Return request submitted successfully!");
      onClose();
      dispatch(updateLoader(false));
      queryclient.invalidateQueries({ queryKey: ["customerorders"] });
    },
    onError: () => {
      toast.error("Failed to submit return request. Please try again later.");
      dispatch(updateLoader(false));
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("order_item", showReturnProduct?.id);
    formData.append("quantity", String(quantity));
    formData.append("reason", reason);
    if (image) formData.append("image", image);

    // Call the API using FormData
    await mutateAsync(formData);

  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Return Request</h2>

        <div className="flex justify-between items-center text-gray-600 mb-2 p-2 hover:bg-gray-50 rounded">
          <div className="flex flex-col">
            <p className="font-medium text-sm md:text-base">
              {showReturnProduct?.product_name}
            </p>
            <div className="flex gap-4 text-xs md:text-sm text-gray-500">
              <span>Quantity: {showReturnProduct?.quantity}</span>
              <span>Size: {showReturnProduct?.size}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-bold text-sm md:text-base">
              PKR {showReturnProduct?.price}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <Input
            type="number"
            value={
              quantity > (showReturnProduct?.quantity ?? 0)
                ? showReturnProduct?.quantity ?? 0
                : quantity
            }
            onChange={(e) => setQuantity(Number(e.target.value))}
            labelText="Return Quantity"
            labelClass="block text-sm font-medium text-gray-700"
            placeholder="Enter quantity to return"
            min="1"
            max={showReturnProduct?.quantity ?? undefined}
          />
        </div>

        <div className="mb-4">
          <TextArea
            value={reason}
            labelText="Reason for Return"
            labelClass="block text-sm font-medium text-gray-700"
            placeholder="Enter reason for return"
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loader}
            className={`${
              loader ? "bg-gray-500" : "bg-blue-600 text-white"
            } p-2 rounded-md`}
          >
            {loader ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnRequestPopup;
