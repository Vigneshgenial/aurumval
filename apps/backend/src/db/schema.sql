-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    mobile VARCHAR(10),
    pan_number VARCHAR(10),
    aadhar_number VARCHAR(12),
    kyc_verified BOOLEAN DEFAULT FALSE,
    kyc_verified_at TIMESTAMP,
    kyc_document_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gold items (portfolio)
CREATE TABLE gold_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    jeweler VARCHAR(100),
    weight_grams DECIMAL(10,2) NOT NULL,
    purity VARCHAR(10),
    purchase_date DATE NOT NULL,
    purchase_price DECIMAL(12,2) NOT NULL,
    current_value DECIMAL(12,2),
    hallmark_number VARCHAR(50),
    image_url VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gold loans
CREATE TABLE gold_loans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    gold_item_id UUID REFERENCES gold_items(id) ON DELETE SET NULL,
    loan_amount DECIMAL(12,2) NOT NULL,
    loan_rate DECIMAL(5,2),
    loan_date DATE NOT NULL,
    repayment_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(50),
    resource_id UUID,
    changes JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_gold_items_user_id ON gold_items(user_id);
CREATE INDEX idx_gold_items_created ON gold_items(created_at);
CREATE INDEX idx_gold_loans_user_id ON gold_loans(user_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gold_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gold_loans ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can view own gold items" ON gold_items
    FOR SELECT USING (auth.uid()::text = (SELECT clerk_id FROM users WHERE id = user_id));

CREATE POLICY "Users can insert own gold items" ON gold_items
    FOR INSERT WITH CHECK (auth.uid()::text = (SELECT clerk_id FROM users WHERE id = user_id));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gold_items_updated_at BEFORE UPDATE ON gold_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gold_loans_updated_at BEFORE UPDATE ON gold_loans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
