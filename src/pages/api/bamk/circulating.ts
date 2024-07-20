import { BAMK_PREMINED_SUPPLY, BAMK_TOTAL_SUPPLY } from '@/lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const data = {
      result: (BAMK_TOTAL_SUPPLY - BAMK_PREMINED_SUPPLY).toString()
    }
    res.status(200).json(data);
}
