import { IonIcon } from "@ionic/react";
import {
  cardOutline,
  saveOutline,
  carOutline,
  trendingUpOutline,
  carSportOutline,
  ellipsisHorizontalCircleOutline,
  checkmarkCircle,
  arrowDownOutline,
  homeOutline,
  arrowUpOutline,
  closeCircleOutline,
} from "ionicons/icons";

const iconMapping: { [key: string]: string } = {
  "Card Successful": cardOutline,
  QuickSave: saveOutline,
  AutoSave: carOutline,
  QuickInvest: trendingUpOutline,
  AutoInvest: carSportOutline,
  "Pending Referral Reward": ellipsisHorizontalCircleOutline,
  "Referral Reward": checkmarkCircle,
  "Withdrawal (Savings > Investment)": arrowDownOutline,
  "Withdrawal (Investment > Savings)": arrowDownOutline,
  "Withdrawal (Wallet > Savings)": arrowDownOutline,
  "Withdrawal (Wallet > Investment)": arrowDownOutline,
  "Withdrawal (Savings > Bank)": arrowDownOutline,
  "Withdrawal (Investment > Bank)": arrowDownOutline,
  "Withdrawal (Wallet > Bank)": arrowDownOutline,
  Property: homeOutline,
  "Referral Reward (Pending)": ellipsisHorizontalCircleOutline,
  "Referral Reward (Confirmed)": checkmarkCircle,
  IBADAN: homeOutline,
  FUNAAB: homeOutline,
  "QuickSave (Pending)": ellipsisHorizontalCircleOutline,
  "QuickSave (Confirmed)": checkmarkCircle,
  "Sent to User": arrowUpOutline,
  "QuickSave (Failed)": closeCircleOutline,
  "Annual Rent (Pending)": checkmarkCircle,
};

export default iconMapping;
