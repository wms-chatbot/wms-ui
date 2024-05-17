
const OrderTable = ({orders}) => {
  return (
    <div>
        <div  className="text-base text-white flex justify-center mt-10">指示情報</div>
        <table className="table-auto mx-auto border border-separate border-tools-table-outline md:text-lg text-sm text-center rounded text-white mt-2">
            <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-xs">指示Id</th>
                    <th className="px-6 py-3 text-left text-xs">納期</th>
                    <th className="px-6 py-3 text-left text-xs">指示数</th>

                </tr>
            </thead>
            <tbody>
                {orders.map((data, index) => (
                    <tr key={index}>
                    <td className="px-6 py-4 text-sm border">{data.Id}</td>
                    <td className="px-6 py-4 text-sm border">{data.Deadline}</td>
                    <td className="px-6 py-4 text-sm border">{data.OrderQuantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default OrderTable
