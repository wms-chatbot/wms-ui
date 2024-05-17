
const LocationTable = ({partLocations, locations}) => {
    // 在庫枠データ
    const stockFrames = [
        { Name: "北海道", Number: "10", Depot: true },
        { Name: "東北", Number: "20", Depot: true },
        { Name: "京浜", Number: "30", Depot: true },
        { Name: "中部", Number: "40", Depot: true },
        { Name: "関西", Number: "50", Depot: true },
        { Name: "九州", Number: "60", Depot: true },
        { Name: "北関東", Number: "70", Depot: true },
        { Name: "非デポ枠", Number: "09", Depot: false },
        { Name: "センターロック", Number: "08", Depot: false },
        { Name: "一般在庫", Number: "なし", Depot: false },
        { Name: "調整在庫", Number: "99", Depot: false },
        { Name: "IMA", Number: "90", Depot: false },
        { Name: "GM/IAL", Number: "91", Depot: false },
        { Name: "INAC", Number: "92", Depot: false },
        { Name: "海外一般", Number: "93", Depot: false },
        { Name: "IIF", Number: "94", Depot: false },
        { Name: "特別在庫", Number: "なし", Depot: false },
        { Name: "その他", Number: "なし", Depot: false }
    ];
    const combinedData = [];
    const nonDepotData = [];

    partLocations.forEach(partLocation => {
        const location = locations.find(location => location.Id === partLocation.LocationId);
        const stockFrame = stockFrames.find(frame => frame.Name === location.StockFrameName);

        const data = {
            Id: partLocation.LocationId,
            StockFrameNumber: stockFrame ? stockFrame.Number : "不明",
            StockFrameName: location.StockFrameName,
            Stock: partLocation.Stock,
            InTransit: partLocation.InTransit
        };

        if (stockFrame && stockFrame.Depot) {
            combinedData.push(data);
        } else {
            nonDepotData.push(data);
        }
    });

  return (
    <div className="md:flex md:justify-center md:gap-10">
        <div>
            <div  className="text-base text-white flex justify-center mt-10">デポ在庫情報</div>
            <table className="table-auto mx-auto border border-separate border-tools-table-outline md:text-lg text-sm text-center rounded text-white mt-2">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs">ロケーションId</th>
                        <th className="px-6 py-3 text-left text-xs">在庫枠No.</th>
                        <th className="px-6 py-3 text-left text-xs">在庫枠名</th>
                        <th className="px-6 py-3 text-left text-xs">在庫数</th>
                        <th className="px-6 py-3 text-left text-xs">搬送中</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedData.map((data, index) => (
                        <tr key={index}>
                        <td className="px-6 py-4 text-sm border">{data.Id}</td>
                        <td className="px-6 py-4 text-sm border">{data.StockFrameNumber}</td>
                        <td className="px-6 py-4 text-sm border">{data.StockFrameName}</td>
                        <td className="px-6 py-4 text-sm border">{data.Stock}</td>
                        <td className="px-6 py-4 text-sm border">{data.InTransit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
        <div className="text-base text-white flex justify-center mt-10">センター在庫情報</div>
            <table className="table-auto mx-auto border border-separate border-tools-table-outline md:text-lg text-sm text-center rounded text-white mt-2">
                <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-xs">ロケーションId</th>
                    <th className="px-6 py-3 text-left text-xs">在庫枠No.</th>
                    <th className="px-6 py-3 text-left text-xs">在庫枠名</th>
                    <th className="px-6 py-3 text-left text-xs">在庫数</th>
                    <th className="px-6 py-3 text-left text-xs">搬送中</th>
                </tr>
                </thead>
                <tbody>
                {nonDepotData.map((data, index) => (
                    <tr key={index}>
                    <td className="px-6 py-4 text-sm border">{data.Id}</td>
                    <td className="px-6 py-4 text-sm border">{data.StockFrameNumber}</td>
                    <td className="px-6 py-4 text-sm border">{data.StockFrameName}</td>
                    <td className="px-6 py-4 text-sm border">{data.Stock}</td>
                    <td className="px-6 py-4 text-sm border">{data.InTransit}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default LocationTable
