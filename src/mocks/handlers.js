import { rest } from 'msw';

export const handlers = [
  rest.post('/api/contact', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
];