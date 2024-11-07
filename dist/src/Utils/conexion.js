"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const supabase_js_1 = require("@supabase/supabase-js");
//ola
(0, dotenv_1.config)();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Faltan las variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY");
}
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey, { db: { schema: 'resapi' } });
exports.default = supabase;
