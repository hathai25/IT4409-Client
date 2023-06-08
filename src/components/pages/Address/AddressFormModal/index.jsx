import {Form, Input, Modal, notification, Select} from "antd";
import {useEffect, useState} from "react";
import {DISTRICTS, PROVINCES, WARDS} from "../Data/address.js";

const AddressFormModal = ({visible, handleCancel, handleOk}) => {
  const [form] = Form.useForm()
  const [provinceId, setProvinceId] = useState()
  const [districtId, setDistrictId] = useState()

  return(
    <Modal
      title="Add new address"
      open={visible}
      onCancel={handleCancel}
      onOk={() => {
        form.validateFields()
          .then(values => {
            handleOk({
              ...values,
              country: "Vietnam",
            })
            form.resetFields()
          })
      }}
    >
      <Form
        form={form}
        layout={"vertical"}
      >
        {() => (
          <>
            <Form.Item
              label={"Full name"}
              name={"fullname"}
              rules={[
                { required: true, message: "Please input your full name!" }
              ]}
            >
              <Input
                placeholder="Full name"
                className={"account-section-input"}
              />
            </Form.Item>
            <Form.Item
              label={"Phone"}
              name={"phone"}
              rules={[
                { required: true, message: "Please input your phone number!" },
                { pattern: /^0[0-9]{9}$/, message: "Please input a valid phone number!" }
              ]}
            >
              <Input
                placeholder="Phone number"
                className={"account-section-input"}
              />
            </Form.Item>
            <Form.Item
              label={"City"}
              name={"provice"}
              rules={[
                { required: true, message: "Please select your province!" }
              ]}
            >
              <Select
                placeholder="Select your city"
                onChange={(value, option) => {
                  console.log(option)
                  setProvinceId(option?.key)
                }}
              >
                {PROVINCES.map(province => {
                  return(
                  <Select.Option
                    key={province.code}
                    value={province?.name}
                  >
                    {province?.name}
                  </Select.Option>)
                })}
              </Select>
            </Form.Item>
            {
              provinceId &&
              <Form.Item
                label={"District"}
                name={"district"}
                rules={[
                  {required: true, message: "Please select your district!"}
                ]}
              >
                <Select
                  placeholder="Select your district"
                  onChange={(value, option) => {
                    setDistrictId(option?.key)
                  }}
                >
                  {DISTRICTS.filter(district => district.province_code === Number(provinceId)).map(district => (
                    <Select.Option key={district.code} value={district.name}>{district.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            }
            {
              provinceId && districtId &&
              <Form.Item
                label={"Ward"}
                name={"commune"}
                rules={[
                  {required: true, message: "Please select your ward!"}
                ]}
              >
                <Select
                  placeholder="Select your ward"
                >
                  {WARDS.filter(ward => ward.district_code === Number(districtId)).map(ward => (
                    <Select.Option key={ward.code} value={ward.name}>{ward.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            }
            {
              provinceId && districtId &&
              <Form.Item
                label={"Address"}
                name={"detail"}
                rules={[
                  {required: true, message: "Please input your address!"}
                ]}
              >
                <Input
                  placeholder="Address"
                />
              </Form.Item>
            }
          </>
        )}
      </Form>
    </Modal>
  )
}

export default AddressFormModal