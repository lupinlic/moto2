import React, { useState, useEffect } from "react";
import axios from 'axios';
import addressApi from '../api/addressApi';

const AddressForm = ({ id, onClose, onSuccess }) => {
    const userId = localStorage.getItem('user_id');
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
    useEffect(() => {
        axios.get('https://api.mysupership.vn/v1/partner/areas/province')
            .then(response => {
                setProvinces(response.data.results);
                console.log(response.data.results)

            })
            .catch(error => {
                console.error('Error fetching provinces:', error);
            });
    }, []);

    // Lấy danh sách Huyện khi chọn Tỉnh
    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        const provinceName = provinces.find(province => province.code === e.target.value);
        console.log(provinceName.name)
        setSelectedProvince(provinceName.name);


        setSelectedDistrict(''); // Reset huyện
        setCommunes([]); // Reset xã

        if (provinceId) {
            axios.get('https://api.mysupership.vn/v1/partner/areas/district', {
                params: { province: provinceId }
            })
                .then(response => {
                    setDistricts(response.data.results);
                })
                .catch(error => {
                    console.error('Error fetching districts:', error);
                });
        } else {
            setDistricts([]);
        }
    };
    // Lấy danh sách Xã khi chọn Huyện
    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        const districtName = districts.find(district => district.code === e.target.value);
        setSelectedDistrict(districtName.name);


        if (districtId) {
            axios.get('https://api.mysupership.vn/v1/partner/areas/commune', {
                params: { district: districtId }
            })
                .then(response => {
                    setCommunes(response.data.results);
                })
                .catch(error => {
                    console.error('Error fetching communes:', error);
                });
        } else {
            setCommunes([]);
        }
    };
    const handleCommuneChange = (e) => {
        const communeId = e.target.value;
        const communeName = communes.find(commune => commune.code === e.target.value);
        setSelectedCommune(communeName.name);
    }

    useEffect(() => {
        if (id) {
            addressApi.getAdressById(id)
                .then((response) => {
                    const data = response.data;
                    setFullName(data.FullName);
                    setEmail(data.Email);
                    setPhone(data.PhoneNumber);
                    setSpecificAddress(data.SpecificAddress);
                    setSelectedProvince(data.Provinces);
                    setSelectedDistrict(data.Districts);
                    setSelectedCommune(data.Wards);
                    console.log(data)
                })
                .catch((error) => {
                    console.error('Có lỗi khi lấy thông tin tài khoản:', error);
                });
        } else {
            // reset khi không phải edit
            setFullName('');
            setEmail('');
            setPhone('');
            setSpecificAddress('');
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            UserID: userId,
            FullName: fullName,
            Email: email,
            PhoneNumber: phone,
            SpecificAddress: specificAddress,
            Provinces: selectedProvince,
            Districts: selectedDistrict,
            isDefault: 0,
            Wards: selectedCommune
        }
        console.log(data)
        try {
            if (id) {
                addressApi.updateAdress(id, data)
                    .then(() => {
                        console.log("Cập nhật địa chỉ thành công");
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi cập nhật địa chỉ:', error);
                    });
            } else {

                addressApi.addAdress(data)
                    .then(() => {
                        console.log("Thêm địa chỉ thành công");
                    })
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi lưu .');
        }

    }
    return (
        <>
            <div className="form-popup">
                <h6>Thêm địa chỉ mới</h6>
                <input type='text' placeholder='Họ tên' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input type='text' placeholder='Số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='text' placeholder='Địa chỉ' value={specificAddress} onChange={(e) => setSpecificAddress(e.target.value)} />
                <div className="row mt-4">
                    <div className="col-md-4">
                        <select value={provinces.code} onChange={handleProvinceChange}>
                            <option>{selectedProvince || "Chọn tỉnh"}</option>
                            {provinces.map((p) => (
                                <option key={p.code} value={p.code}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="col-md-4">
                        <select value={districts.code} onChange={handleDistrictChange} disabled={!selectedProvince}>
                            <option value="">{selectedDistrict || "Chọn huyện"}</option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.code}>
                                    {d.name}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="col-md-4">
                        <select disabled={!selectedDistrict} value={communes.code} onChange={handleCommuneChange}>
                            <option value="">{selectedCommune || "Chọn xã"}</option>
                            {communes.map((w) => (
                                <option key={w.code} value={w.code}>
                                    {w.name}
                                </option>
                            ))}
                        </select>

                    </div>

                </div>
                <div className="mt-4 float-end">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Lưu</button>
                    <button type="button" className="ms-3 btn btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </>
    )
}

export default AddressForm