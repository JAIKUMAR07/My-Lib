const express = require('express');
const router = express.Router();
const { authenticateUser, requireRole } = require('../middleware/auth');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

router.get('/health', async (req, res) => {
  try {
    const { error } = await supabase.from('categories').select('id').limit(1);
    res.json({
      status: 'Nex-Lib Settings API Online',
      database: error ? 'Disconnected' : 'Connected',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ status: 'Error', error: err.message });
  }
});

router.post('/test-save', async (req, res) => {
  const { name, link } = req.body;
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert({ name: name || `TestCategory_${Date.now()}`, link: link || null })
      .select()
      .single();

    if (error) throw error;

    await supabase.from('categories').delete().eq('id', data.id);
    res.json({ success: true, message: 'Direct save works', data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, message: 'Supabase blocked the save.' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/categories', authenticateUser, requireRole(['admin', 'librarian']), async (req, res) => {
  const { name, link } = req.body;
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert({ name, link: link || null })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, message: 'Category added', data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.patch('/categories/:id', authenticateUser, requireRole(['admin', 'librarian']), async (req, res) => {
  const { link } = req.body;
  try {
    const { data, error } = await supabase
      .from('categories')
      .update({ link: link || null })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: 'Category icon link updated', data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.delete('/categories/:id', authenticateUser, requireRole(['admin', 'librarian']), async (req, res) => {
  try {
    const { error } = await supabase.from('categories').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Category removed' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/languages', async (req, res) => {
  try {
    const { data, error } = await supabase.from('languages').select('*').order('name');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/languages', authenticateUser, requireRole(['admin', 'librarian']), async (req, res) => {
  const { name } = req.body;
  try {
    const { data, error } = await supabase
      .from('languages')
      .insert({ name })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, message: 'Language added', data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.delete('/languages/:id', authenticateUser, requireRole(['admin', 'librarian']), async (req, res) => {
  try {
    const { error } = await supabase.from('languages').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Language removed' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
