import * as Ajv from 'ajv'
import { promises as fs } from 'fs'
import * as path from 'path'

describe('schemas', () => {
	let ajv: Ajv.Ajv
	beforeEach(async () => {
		ajv = new Ajv({
			schemas: [
				JSON.parse(
					await fs.readFile(
						path.resolve(
							process.cwd(),
							'docs',
							'firmware',
							'batch-schema.json',
						),
						'utf-8',
					),
				),
				JSON.parse(
					await fs.readFile(
						path.resolve(process.cwd(), 'docs', 'firmware', 'schema.json'),
						'utf-8',
					),
				),
			],
		})
	})

	describe('schema.json', () => {
		it('should validate state.json', async () => {
			const validate = ajv.getSchema(
				'https://github.com/bifravst/bifravst/blob/saga/docs/firmware/schema.json',
			)
			const state = await fs.readFile(
				path.resolve(process.cwd(), 'docs', 'firmware', 'state.json'),
				'utf-8',
			)
			const valid = await validate(JSON.parse(state))
			expect(validate.errors).toBeNull()
			expect(valid).toBeTruthy()
		})
	})

	describe('batch-schema.json', () => {
		it('should validate batch-message.json', async () => {
			const validate = ajv.getSchema(
				'https://github.com/bifravst/bifravst/blob/saga/docs/firmware/batch-schema.json',
			)
			const state = await fs.readFile(
				path.resolve(process.cwd(), 'docs', 'firmware', 'batch-message.json'),
				'utf-8',
			)
			const valid = await validate(JSON.parse(state))
			expect(validate.errors).toBeNull()
			expect(valid).toBeTruthy()
		})
	})
})
