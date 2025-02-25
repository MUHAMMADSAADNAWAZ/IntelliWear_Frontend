import { FormikProps } from "formik"

import { Button, Input } from "@components/common"
import { PaymentDto } from "@dto/payment.dto"
import { CancelIcon } from "@svg"

interface PaymentPopupProps {
    form: FormikProps<PaymentDto>
    setOpen: (open: boolean) => void
}

const PaymentPopup = ({form , setOpen}: PaymentPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
        <form onSubmit={form?.handleSubmit} className="w-full flex items-center justify-center ">
         {form.values.payment && (
          <div className=" p-6 rounded-lg shadow-md mb-6 w-[80%] bg-white">
            <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div
                className="cursor-pointer p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                onClick={() => {
                    setOpen(false);
                }}
            >
                <CancelIcon />
            </div>

            </div>
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
            ) : form.values.payment === "credit-card/debit card" ? (
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
             <div className="flex items-center justify-center mt-6">
          <Button
            type="submit"
            className=" bg-blue-600 text-white py-2 px-8 rounded hover:bg-blue-700"
          >
            Confirm Order
          </Button>
        </div>
          </div>
        )}

       
    </form>
    </div>
  )
}

export default PaymentPopup