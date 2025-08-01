"""empty message

Revision ID: 01c76c9998b0
Revises: 84772806df06
Create Date: 2025-07-25 21:30:54.800297

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01c76c9998b0'
down_revision = '84772806df06'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('photo_url',
               existing_type=sa.VARCHAR(),
               type_=sa.Text(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('photo_url',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               existing_nullable=True)

    # ### end Alembic commands ###
