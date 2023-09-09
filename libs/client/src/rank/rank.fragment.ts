import { gql } from 'graphql-tag';

export interface RankFragment {
  id: number;
  name: string;
  description: string;
  badgeCode: string;
  showStaff: boolean;
}

export const RANK_FRAGMENT: any = gql`
  fragment RankFragment on RankModel {
    id
    name
    description
    badgeCode
    showStaff
  }`