import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Bank() {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="เลือกธนาคาร" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bbl">ธนาคารกรุงเทพ (BBL)</SelectItem>
          <SelectItem value="kbank">ธนาคารกสิกรไทย (KBANK)</SelectItem>
          <SelectItem value="ktb">ธนาคารกรุงไทย (KTB)</SelectItem>
          <SelectItem value="scb">ธนาคารไทยพาณิชย์ (SCB)</SelectItem>
          <SelectItem value="bay">ธนาคารกรุงศรีอยุธยา (BAY)</SelectItem>
          <SelectItem value="tmb">ธนาคารทหารไทยธนชาต (ttb)</SelectItem>
          <SelectItem value="uob">ธนาคารยูโอบี (UOB)</SelectItem>
          <SelectItem value="cimb">ธนาคารซีไอเอ็มบี ไทย (CIMB Thai)</SelectItem>
          <SelectItem value="tisco">ธนาคารทิสโก้ (TISCO)</SelectItem>
          <SelectItem value="kkp">ธนาคารเกียรตินาคินภัทร (KKP)</SelectItem>
          <SelectItem value="icbc">ธนาคารไอซีบีซี (ไทย) (ICBC)</SelectItem>
          <SelectItem value="lhbank">
            ธนาคารแลนด์ แอนด์ เฮ้าส์ (LH Bank)
          </SelectItem>
          <SelectItem value="gsb">ธนาคารออมสิน (GSB)</SelectItem>
          <SelectItem value="baac">
            ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (ธ.ก.ส.)
          </SelectItem>
          <SelectItem value="ghbank">ธนาคารอาคารสงเคราะห์ (ธอส.)</SelectItem>
          <SelectItem value="smebank">
            ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย (SME Bank)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
