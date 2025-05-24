import { Line, Pie } from "react-chartjs-2";
import orderApi from "../../api/orderApi";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

function Home() {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [type, setType] = useState("day");

    const [totalOrders, setTotalOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [revenue, setRevenue] = useState(0);

    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const [statistics, setStatistics] = useState(null);

    const [topProducts, setTopProducts] = useState([]);

    const getStatistics = () => {
        orderApi.getAdvancedStatistics({ from_date: fromDate, to_date: toDate, type })
            .then((res) => {
                const data = res;
                console.log(data);
                setTotalOrders(data.total_orders);
                setCompletedOrders(data.completed_orders);
                setRevenue(data.revenue);
                setLabels(data.chart.labels);
                setValues(data.chart.data);
                setTopProducts(data.top_products);
            })
            .catch(console.error);
    };

    useEffect(() => {
        getStatistics();
    }, []);
    const handleFilter = () => {
        if (!fromDate || !toDate) return alert("Chọn ngày hợp lệ!");
        getStatistics();
    };
    const handleAll = async () => {
        try {
            const res = await orderApi.getAdvancedStatistics(); // không truyền ngày
            setStatistics(res);
            console.log(res);
            // Reset form nếu muốn
            setFromDate("");
            setToDate("");
        } catch (error) {
            console.error("Lỗi khi thống kê tất cả:", error);
        }
    };

    return (
        <div className="p-3" style={{ background: "#fff", minHeight: "100vh" }}>
            <div className="border-bottom">
                <i style={{ color: "#62677399" }}>Welcome!</i>
            </div>

            <div className="row mt-2 p-2">
                <div className="col-md-4 p-2" style={{ height: "100px" }}>
                    <div
                        style={{
                            boxShadow: "0 -4px 10px 4px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                        }}
                    >
                        <h6 className="pt-3">Doanh thu</h6>
                        <p>{revenue.toLocaleString()} đ</p>
                    </div>
                </div>
                <div className="col-md-4 p-2" style={{ height: "100px" }}>
                    <div
                        style={{
                            boxShadow: "0 -4px 10px 4px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                        }}
                    >
                        <h6 className="pt-3">Số đơn hàng</h6>
                        <p>{totalOrders}</p>
                    </div>
                </div>
                <div className="col-md-4 p-2" style={{ height: "100px" }}>
                    <div
                        style={{
                            boxShadow: "0 -4px 10px 4px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                        }}
                    >
                        <h6 className="pt-3">Đơn hoàn thành</h6>
                        <p>{completedOrders}</p>
                    </div>
                </div>
            </div>


            <div className="row mt-4 align-items-center">
                <div className="col-md-3">
                    <label style={{ marginRight: "8px" }}>Từ ngày : </label>
                    <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="col-md-3">
                    <label style={{ marginRight: "8px" }}>Đến ngày : </label>
                    <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
                <div className="col-md-2 mt-4">
                    <button style={{ borderColor: "#62677399", borderRadius: '5px' }} onClick={handleFilter}>Thống kê</button>
                    <button type="button" style={{ borderColor: "#62677399", marginLeft: "10px", borderRadius: '5px' }}
                        onClick={handleAll}>
                        Tất cả
                    </button>
                </div>
            </div>
            {/* Chọn năm */}
            <div className="chart row">
                <div className="col-md-2 mt-2">
                    <label>Loại thống kê</label>
                    <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="day">Theo ngày</option>
                        <option value="month">Theo tháng</option>
                        <option value="quarter">Theo quý</option>
                        <option value="year">Theo năm</option>
                    </select>
                </div>
            </div>
            <h5 style={{ color: "#62677399", marginTop: "16px" }}>Biểu đồ thống kê</h5>
            {/* Biểu đồ Line */}
            {/* Biểu đồ Pie */}
            <div className="row mt-3">
                <div className="col-md-4">
                    <h6>Top 5 sản phẩm bán chạy</h6>
                    <Pie
                        data={{
                            labels: topProducts.map((p) => p.name),
                            datasets: [
                                {
                                    data: topProducts.map((p) => p.quantity),
                                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                                },
                            ],
                        }}
                    />
                </div>

                <div className="col-md-8" style={{ marginBottom: "100px" }}>
                    <h6>Biểu đồ doanh thu</h6>
                    <Line
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: "Doanh thu",
                                    data: values,
                                    fill: false,
                                    borderColor: "blue",
                                    tension: 0.1,
                                },
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
