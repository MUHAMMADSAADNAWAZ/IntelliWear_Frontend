interface AnalyticsComponentProps {
    name: string,
    price: string,
    color: string
}

const SalesAnalyticsComponent = ({name , price , color}: AnalyticsComponentProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-700 pb-3">{name}</h3>
    <p className={`text-2xl font-bold ${color}`}>{price} {name !== "Total Orders" ? "PKR" : ""}</p>
  </div>
  )
}

export default SalesAnalyticsComponent