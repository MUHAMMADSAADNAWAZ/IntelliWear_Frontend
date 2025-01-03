import { CitySelect } from "@components/CitySelect";
import { Button, Input } from "@components/common";
import PaymentModal from "@components/PaymentModal/PaymentModal";
import { pakistaniCities } from "@Data/data";
import { CheckoutDto } from "@dto/checkout.dto";
import { RootState } from "@redux/store";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";

interface CityOption {
  value: string;
  label: string;
}

const Checkout = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const paymentMethods = [
    "Easypaisa",
    "JazzCash",
    "Credit Card",
    "Debit Card",
    "Cash on Delivery",
  ];

  const transformedPaymentMethods = paymentMethods.map((method) => ({
    label: method,
    value: method.toLowerCase().replace(" ", "-"),
  }));

  // Transform the data for react-select
  const cityOptions: CityOption[] = pakistaniCities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const form = useFormik({
    initialValues: CheckoutDto.initialValues(),
    validationSchema: CheckoutDto.yupSchema(),
    onSubmit: (values) => {
      console.log("Checkout dto values are", values);
      setModalOpen(true);
    },
  });

  const handleModalConfirm = (details: any) => {
    console.log("Payment Details:", details);
    // Proceed to save order details or process payment
  };

  return (
    <div className="p-4 w-full mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
              </div>
              <p>Rs. {item.price * item.quantity}</p>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>Rs. {totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={form.handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <div className="space-y-4">
          <div>
              <Input
                type="text"
                labelText="Name"
                labelClass="block text-sm font-medium mb-1"
                name="name"
                formik={form}
                placeholder="Enter your Name"
              />
            </div>
            <CitySelect
              name="city"
              labelText="Select Your City"
              formik={form}
              options={cityOptions}
              labelClass="block text-sm font-medium mb-1"
              placeholder="Select a city"
              className="text-black"
            />
            <div>
              <Input
                type="text"
                labelText="Address"
                labelClass="block text-sm font-medium mb-1"
                name="address"
                formik={form}
                placeholder="Enter your Address"
              />
            </div>
            <div>
              <Input
                type="text"
                name="phone"
                formik={form}
                labelText="Phone Number"
                labelClass="block text-sm font-medium mb-1"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <div className="space-y-2">
            <Input
              type="radio"
              radioOptions={transformedPaymentMethods}
              formik={form}
              name="payment"
              className="form-radio"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className=" w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Place Order
          </Button>
        </div>
      </form>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        paymentMethod={form?.values?.payment}
        totalAmount={totalAmount}
        onClose={() => setModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default Checkout;
