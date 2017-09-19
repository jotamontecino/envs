export async function hi(req, reply) {
  const contents = {
    msg: 'Hello world'
  };

  return reply(JSON.stringify(contents))
    .header('X-Meta-Total', 10);
};
