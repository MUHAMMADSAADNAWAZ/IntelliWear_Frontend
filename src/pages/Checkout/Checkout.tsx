import { CitySelect } from "@components/CitySelect";
import { Button, Input } from "@components/common";
import { pakistaniCities } from "@Data/data";
import { CheckoutDto } from "@dto/checkout.dto";
import { RootState } from "@redux/store";
import { ROUTE_MYORDERS } from "@routes/constants";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CityOption {
  value: string;
  label: string;
}

const Checkout = () => {

  const navigate = useNavigate()

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
  const checkedCartItems = cartItems.filter((item) => item.checked)

  const totalPrice = cartItems
    .filter((item) => item.checked) 
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const form = useFormik({
    initialValues: CheckoutDto.initialValues(),
    validationSchema: CheckoutDto.yupSchema(),
    onSubmit: (values) => {
      console.log("Checkout dto values are", values);
      toast.success("Your Order is placed Successfully!")
      navigate(ROUTE_MYORDERS);
    },
  });

  return (
    <div className="p-4 w-full mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {checkedCartItems.map((item) => (
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
              <span>Rs. {totalPrice}</span>
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
          <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
          <div className="">
            <Input
              wrapperClass="flex flex-start flex-col md:flex-row gap-2 md:items-center md:justify-between"
              type="radio"
              radioOptions={transformedPaymentMethods}
              formik={form}
              name="payment"
              className="form-radio"
            />
          </div>
        </div>

        {form.values.payment && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            {form.values.payment === "easypaisa" || form.values.payment === "jazzcash" ? (
              <>
                <Input
                  type="text"
                  labelText="Phone Number"
                  name="easypaisaPhone"
                  formik={form}
                  placeholder={`Enter your ${form.values.payment} number`}
                />
              
              </>
            ) : form.values.payment === "credit-card" || form.values.payment === "debit-card" ? (
              <>
                <Input
                  type="text"
                  labelText="Card Number"
                  placeholder="Enter your Card Number"
                  name="cardNumber"
                  formik={form}
                />
                <Input
                  type="month"
                  labelText="Expiry Date"
                  placeholder="Select Expiry Date"
                  min={new Date().toISOString().slice(0, 7)}
                  name="expiryDate"
                  formik={form}
                />
                <Input
                  type="text"
                  labelText="CVV"
                  placeholder="Enter CVV"
                  name="cvv"
                  formik={form}
                />
              </>
            ) : (
              <>
              <p className="text-sm text-gray-600">
                Your order is being processed and will be delivered in 3-5 days.
              </p>
              <p className="text-sm text-gray-600 font-bold"> You will be charged 50 more rupees for home delivery.</p>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className=" bg-blue-600 text-white py-2 px-8 rounded hover:bg-blue-700"
          >
            Place Order
          </Button>
        </div>
      </form>

    </div>
  );
};

export default Checkout;
