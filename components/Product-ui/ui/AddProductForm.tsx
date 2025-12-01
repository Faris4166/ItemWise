import React from "react";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  CreditCardIcon,
  InfoIcon,
  MailIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import BtnAdd from "./btnAdd";

export default function AddProductForm() {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <BtnAdd />
    </div>
  );
}
