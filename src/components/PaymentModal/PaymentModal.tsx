import { Button, Input } from "@components/common";
import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";

interface PaymentModalProps {
  isOpen: boolean;
  paymentMethod: string;
  totalAmount: number;
  onClose: () => void;
  onConfirm: (details: any) => void; // Pass payment details to the parent
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  paymentMethod,
  totalAmount,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

    const [showCVV, setShowCVV] = useState(false);

    const handleCVV = () =>{
      setShowCVV(!showCVV)
    }


  const handleConfirm = () => {
    const details = {}; // Gather details based on paymentMethod
    onConfirm(details);
    onClose();
  };

  console.log("new Date().toISOString().slice(0, 7)" ,new Date().toISOString().slice(0, 7));
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 flex flex-col gap-2 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        {paymentMethod === "easypaisa" || paymentMethod === "jazzcash" ? (
          <>
            <p>Enter your {paymentMethod === "easypaisa" ? "Easypaisa" : "JazzCash"} number:</p>
            <Input
              type="text"
              placeholder="Phone Number"
            />
            <p>Send the total amount of Rs. {totalAmount} to 1234567890.</p>
          </>
        ) : paymentMethod === "credit-card" || paymentMethod === "debit-card" ? (
          <>
            <p>Enter your card details:</p>
            <Input
              type="text"
              labelText="Card Number"
              placeholder="Enter Card Number"
            />
            <Input
              type="month"
              min={new Date().toISOString().slice(0, 7)}
              labelText="Expiry Date"
              placeholder="Expiry Date"
            />
            <Input
                                    placeholder="Enter CVV Number"
                                    labelText="Card Verification Value"
                                    labelClass="text-blue-500 font-semibold"
                                    required
                                    name="cvv"
                                    type={showCVV ? "" : "password"}
                                    // formik={form}
                                    icon={
                                        showCVV ? (
                                          <FaRegEyeSlash
                                            color=""
                                            className=" w-8 h-8  font-Arimo cursor-pointer "
                                            onClick={handleCVV}
                                          />
                                        ) : (
                                          <IoEyeOutline
                                            color=""
                                            className=" w-8 h-8  font-Arimo cursor-pointer"
                                            onClick={handleCVV}
                                          />
                                        )
                                      }
                                />
          </>
        ) : (
          <p>Your order is being processed and will be delivered in 3-5 days.</p>
        )}
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
